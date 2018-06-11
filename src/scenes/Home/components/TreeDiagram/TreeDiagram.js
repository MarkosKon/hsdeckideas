import React, { Component } from "react";
import { getDendrogramData } from "../../../../utils/deckUtils";
var d3 = require("d3");

class TreeDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: props.deck,
      data: getDendrogramData(props.deck)
    };
  }

  componentDidMount() {
    // render the dendrogram when component mounts.
    this.dendrogramRender(this.state.data);
  }

  static getDerivedStateFromProps(props, state) {
    // If the deck we get from props is different from
    // the one we have in the state, calculate the next state.
    if (props.deck !== state.deck) 
      return {
        deck: props.deck,
        data: getDendrogramData(props.deck)
      }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // After the state updates (first time excluded)
    // render the dendrogram
    if (prevProps.deck !== this.state.deck) 
      this.dendrogramRender(this.state.data);
  }

  dendrogramRender(data) {
    // Temporary fix because i don't know hot to update it correctly.
    document.querySelector(".dendrogram-wrapper").innerHTML = "";

    var margin = { top: 20, right: 50, bottom: 20, left: 50 },
      width = 700 - margin.left - margin.right,
      height = 1200 - margin.top - margin.bottom;

    var i = 0,
      duration = 750;

    var tree = d3.layout.tree().size([height, width - 100]);

    var diagonal = d3.svg.diagonal().projection(function(d) {
      return [d.y, d.x];
    });

    var svg = d3
      .select(".dendrogram-wrapper")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    // .attr("transform", "translate(40, 0)");

    var root = data;
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      // nodes.forEach(function(d) {
      //   d.y = d.depth * 180;
      // });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click);

      nodeEnter
        .append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeEnter
        .append("text")
        .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
          return d.name;
        })
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select("text").style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);

      nodeExit.select("text").style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link").data(links, function(d) {
        return d.target.id;
      });

      // Enter any new links at the parent's previous position.
      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link
        .transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }

  render() {
    return (
      <div id="dendrogram" className="panel">
        <div className="panel-heading">
          <h2 className="text-center">History (visual)</h2>
        </div>
        <div className="panel-body">
          <div className="well" style={{ backgroundColor: "whitesmoke" }}>
            This sections shows you what cards the algorithm selected based on
            the priorities of the cards that were included in a previous step.
            Also shows which cards were selected by the archetype priorities. If
            you want to know why those cards where selected see the text version
            of the card selection history.
          </div>
          <div className="dendrogram-wrapper" />
        </div>
      </div>
    );
  }
}

export default TreeDiagram;

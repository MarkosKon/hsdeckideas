import React, { Component } from "react";
import styled from "styled-components";
import BootstrapCard from "../../../../components/BootstrapCard/BootstrapCard";
import { getDendrogramData } from "../../../../utils/D3Dendrogram";

var d3 = require("d3");

const ContainerCard = styled(BootstrapCard)`
  overflow: auto;
`;

const StyledCard = styled(BootstrapCard)`
  background-color: whitesmoke !important;
  box-shadow: none !important;
`;

class TreeDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: props.deck,
      data: getDendrogramData(props.deck)
    };
  }

  componentDidMount() {
    this.dendrogramRender(this.state.data);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.deck !== state.deck)
      return {
        deck: props.deck,
        data: getDendrogramData(props.deck)
      };
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.deck !== this.state.deck)
      this.dendrogramRender(this.state.data);
  }

  dendrogramRender(data) {
    // Temporary fix because i don't know hot to update it correctly.
    document.querySelector(".dendrogram-wrapper").innerHTML = "";

    var margin = { top: 20, right: 50, bottom: 20, left: 50 };
    var width = 900 - margin.left - margin.right;
    var height = 1200 - margin.top - margin.bottom;

    var i = 0;
    var duration = 750;

    var tree = d3.layout.tree().size([height, width - 100]);

    var diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);

    var svg = d3
      .select(".dendrogram-wrapper")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var root = data;
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();
      var links = tree.links(nodes);

      // Normalize for fixed-depth.
      // nodes.forEach(function(d) {
      //   d.y = d.depth * 180;
      // });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, d => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr(
          "transform",
          d => "translate(" + source.y0 + "," + source.x0 + ")"
        )
        .on("click", click);

      nodeEnter
        .append("circle")
        .attr("r", 1e-6)
        .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

      nodeEnter
        .append("text")
        .attr("x", d => (d.children || d._children ? -13 : 13))
        .attr("dy", ".35em")
        .attr("text-anchor", d => (d.children || d._children ? "end" : "start"))
        .text(d => d.name)
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

      nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

      nodeUpdate.select("text").style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);

      nodeExit.select("text").style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link").data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", d => {
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
        .attr("d", d => {
          var o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(d => {
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
      <ContainerCard id="dendrogram" title="History (visual)">
        <StyledCard withHeader={false}>
          <p>
            This sections shows you in a <b>visual</b> way the{" "}
            <b>card selection process</b>. Some of the cards have{" "}
            <b>priorities</b> and those priorities lead to other cards and so
            on. At some point we add a <b>suitable archetype</b> and based on
            that archetype's priorities we add some more cards. If you want to
            see <b>more details</b> check
            <a
              href="#openhistory"
              onClick={e => {
                e.preventDefault();
                this.props.handleOpenModal();
              }}
            >
              {" "}
              the text and more detailed version{" "}
            </a>{" "}
            of this section.
          </p>
        </StyledCard>
        <div className="dendrogram-wrapper" />
      </ContainerCard>
    );
  }
}

export default TreeDiagram;

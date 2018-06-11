import React from "react";

export default props =>
  props.UIVisible ? (
    <div className="col-sm-12">
      <div className="panel">
        <div className="panel-heading">
          <h2 className="text-center">Currently working on</h2>
        </div>
        <div className="panel-body">
          <div
            className="table-responsive"
            style={{ backgroundColor: "whitesmoke", border: "1px solid #ddd" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <td>Order</td>
                  <td className="hidden-xs">Feature</td>
                  <td>Description</td>
                  <td className="hidden-xs">ETA</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="hidden-xs">User integration</td>
                  <td>
                    Add users in order for you to make filter suggestions, card
                    ratings and more. The filter suggestions for cards is
                    especially exciting because first of all it's fun to create
                    a filter and see what cards come out from the database. For
                    this to work a card will have different versions, something
                    that makes sense because the same card can be played
                    differently from deck to deck. For example Defender of Argus
                    is a card that in an aggro deck requires some fast low cost
                    minions and in a handlock deck requires molten and mountain
                    giants. Also the existing filters represent my personal view
                    on the game. You will probably see the cards in a different
                    way. So by submitting your ideas you will have fun and in
                    the same time you will help make this app better.
                  </td>
                  <td className="hidden-xs">
                    not sure when, hopefully sometime in June 2018
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;

import React, { Component } from "react";
import TopQuestions from "./TopQuestions";
import "../styles/users.scss";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      tags: []
    };
  }
  componentDidMount() {
    this.getUser();
    this.getTags();
  }

  getTags = () => {
    fetch(
      `https://api.stackexchange.com/2.2/users/${this.props.match.params.id}/tags?&site=stackoverflow`
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result.items);
          this.setState({ tags: result.items });
        },
        error => {
          console.log(error);
        }
      );
  };
  getUser = () => {
    fetch(
      `https://api.stackexchange.com/2.2/users/${this.props.match.params.id}?site=stackoverflow`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({ user: result.items[0] });
        },
        error => {
          console.log(error);
        }
      );
  };
  render() {
    let { user, tags } = this.state;
    let badgeData = user.badge_counts;
    let badges = badgeData && Object.keys(badgeData);

    return (
      <div className="user-details">
        <div className="user-badge">
          <div className="badge-icon">
            <img src={user.profile_image} alt={user.display_name} />
            <div className="reputation">
              <span className="rep">{user.reputation}</span>{" "}
              <span className="rep-text">Reputation</span>
            </div>
            <div className="badges">
              {badges &&
                badges.map(badge => {
                  return (
                    <div className={`${badge}-badge`}>{badgeData[badge]}</div>
                  );
                })}
            </div>
          </div>
          <div className="user-name">
            <h1>{user.display_name}</h1>
            <div>{user.website_url ? user.website_url : ""}</div>
          </div>
        </div>
        <div className="tags">
          <h1>Top Tags</h1>
          {tags &&
            tags.map(tag => {
              return (
                <div className="user-tag">
                  <p className="tag-name">{tag.name}</p>
                  <p className="tag-score">Score {tag.count}</p>
                </div>
              );
            })}
        </div>

        <TopQuestions userId={this.props.match.params.id} />
      </div>
    );
  }
}

export default User;

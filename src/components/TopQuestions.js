import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/top-questions.scss";

class TopQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questionsData: []
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    if (this.props.userId) {
      fetch(
        `https://api.stackexchange.com/2.2/users/${this.props.userId}/questions?site=stackoverflow`
      )
        .then(res => res.json())
        .then(
          result => {
            this.setState({ questionsData: result.items });
          },
          error => {
            console.log(error);
          }
        );
    } else {
      fetch(
        "https://api.stackexchange.com/2.2/questions/featured?site=stackoverflow"
      )
        .then(res => res.json())
        .then(
          result => {
            this.setState({ questionsData: result.items });
          },
          error => {
            console.log(error);
          }
        );
    }
  };
  render() {
    let { questionsData } = this.state;
    return (
      <div className="top-questions">
        <h1>Top Questions</h1>
        {questionsData.map(question => {
          return (
            <div className="question" key={question.question_id}>
              <div className="question-card">
                <div>
                  <p>{question.score}</p> <p>votes</p>
                </div>
                <div className={question.is_answered ? "is-answered" : ""}>
                  <p>{question.answer_count}</p> <p>answers</p>
                </div>
                <div>
                  <p>{question.view_count}</p> <p>views</p>
                </div>
              </div>
              <div className="question-detail">
                <div className="question-title">
                  {question.bounty_amount && !this.props.userId ? (
                    <span className="question-bounty">
                      {question.bounty_amount}
                    </span>
                  ) : (
                    ""
                  )}
                  <span
                    dangerouslySetInnerHTML={{ __html: question.title }}
                  ></span>
                </div>
                <div className="question-footer">
                  <div className="tags">
                    {question.tags.map((tag, index) => {
                      return (
                        <p key={index} className="tag">
                          {tag}
                        </p>
                      );
                    })}
                  </div>
                  <div className="question-modified">
                    <span>modified</span>
                    {" " +
                      new Date(
                        this.props.userId
                          ? question.last_activity_date
                          : question.bounty_closes_date
                      ).toLocaleString()}
                    {this.props.userId ? (
                      ""
                    ) : (
                      <NavLink to={`/user/${question.owner.user_id}`}>
                        {" " + question.owner.display_name}
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TopQuestions;

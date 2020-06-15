import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component';


export default class feedBackView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 1,
            feedBackDescription: null
        }
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    render() {
        const { rating } = this.state;
        return (
            <div className="feedback-container">
                <div className="feedback-header">
                    <button className="cross" type="button" onClick={() => this.props.shouldDisplay('no')}>X</button>
                </div>
                <div className="feedback-body">
                    <div className="hand-svg ">
                        <span className="fa fa-thumbs-up thumb" ></span>
                    </div>
                    <div className="star-container">
                        Rate your experience
             <div className="star">
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                emptyStarColor={"#314c72"}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>
                    <form onSubmit={e => { e.preventDefault(); this.props.onFeedBackSubmit(this.state.rating, this.state.feedBackDescription); this.props.shouldDisplay('no') }}>
                        <textarea onChange={e => this.setState({ feedBackDescription: e.target.value })}></textarea>
                        <input type="submit" className="btn-rating" value="Rate" />
                    </form>
                </div>
            </div>
        )
    }
}



// const FeedBackView = (payload) => {
//     const { shouldDisplay } = payload
//     const [starRating, changeRating] = useState(rating)
//     return (



//     )
// }


// export default FeedBackView;
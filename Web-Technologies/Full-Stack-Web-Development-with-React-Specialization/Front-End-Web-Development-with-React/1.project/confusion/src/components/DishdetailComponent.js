import React, {Component} from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle
} from 'reactstrap';


export default class DishdetailComponent extends Component {
    renderDate(date) {
 
        const jsDate = Date(date);

        var dateToArr = jsDate.split(" ")
        var joinDate = dateToArr.slice(0,4).join(" ");
        return joinDate;
    }
    renderComments(comments) {
        return(comments.map((comment) => {
            return (

                <ul className="list-unstyled">
                    <li>{
                        comment.comment
                    }</li>
                    <li>-- {
                        comment.author
                    }
                        , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
            );
        }));

    }
    renderCommentContainer(dish) {
        if (dish != null) {
            return (
                <>

                    <h4>Comments</h4>
                    {
                    this.renderComments(dish.comments)
                } </>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top
                        src={
                            this.props.dish.image
                        }
                        alt={
                            this.props.dish.name
                        }/>
                    <CardBody>
                        <CardTitle>{
                            this.props.dish.name
                        }</CardTitle>
                        <CardText>{
                            this.props.dish.description
                        } </CardText>
                    </CardBody>
                </Card>
            );


        } else {
            return (
                <div></div>
            );

        }


    };
    render() {


        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {
                    this.renderDish(this.props.dish)
                } </div>
                <div className="col-12 col-md-5 m-1">

                    {
                    this.renderCommentContainer(this.props.dish)
                } </div>
            </div>
        )
    }
}

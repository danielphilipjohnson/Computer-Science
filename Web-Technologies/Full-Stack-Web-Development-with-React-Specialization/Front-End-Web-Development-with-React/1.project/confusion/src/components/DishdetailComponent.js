import React, {Component} from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle
} from 'reactstrap';




function RenderCommentContainer({dish}) {
    if (dish != null) {
        return (
            <>

                <h4>Comments</h4>
                {
                RenderComments(dish)
            } </>
        )
    } else {
        return (
            <div></div>
        )
    }
}


function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top
                    src={
                        dish.image
                    }
                    alt={
                        dish.name
                    }/>
                <CardBody>
                    <CardTitle>{
                       dish.name
                    }</CardTitle>
                    <CardText>{
                        dish.description
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



function RenderComments({comments}) {
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

const  DishDetail = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                {
                RenderDish(props)
            } </div>
            <div className="col-12 col-md-5 m-1">

                {
                RenderCommentContainer(props)
            } </div>
        </div>
    )


}


export default DishDetail;
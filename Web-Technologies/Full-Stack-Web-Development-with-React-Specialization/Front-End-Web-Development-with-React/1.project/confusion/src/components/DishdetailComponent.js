import React, { Component } from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Label,
    Col
} from 'reactstrap';
//import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';








class CommentForm extends Component {
    constructor(props) {

        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModal: false,
            author: '',
            rating: '',
            comments: ''
            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));

    }





    render() {
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return (
            <div>
                <Modal isOpen={
                        this.state.isModalOpen
                    }
                    toggle={
                        this.toggleModal
                }>
                    <ModalHeader toggle={
                        this.toggleModal
                    }>Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={
                            (values) => this.handleSubmit(values)
                        }>
                            <Row className="form-group">
                                <Label htmlFor="rating"
                                    md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control" defaultValue="1">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author"
                                    md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                    validators={{
                                       minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment"
                                    md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="8" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={
                                    {
                                        size: 10,
                                    }
                                }>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline
                    onClick={
                        this.toggleModal
                }>

                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </Button>
            </div>
        )
    }
}





function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top
                    src={
                        dish.image
                    }
                    alt={
                        dish.name
                    } />
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


function RenderComments({ comments }) {
    return (comments.map((comment) => {
        return (

            <ul className="list-unstyled">
                <li>{
                    comment.comment
                }</li>
                <li>-- {
                    comment.author
                }
                    , {
                        new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))
                    }</li>
            </ul>
        );
    }));

}



const DishDetail = (props) => {

   
    
    
    return (
        <div className="container">
            <div className="row">
               
                <Breadcrumb>

                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {
                            props.dish.name
                        }</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{
                        props.dish.name
                    }</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={
                        props.dish
                    } />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={
                        props.comments
                    } />
                     <CommentForm />
                </div>
            </div>
        </div>
    );


}


export default DishDetail;

import React from 'react';
import rightArrow from '../icons/right-arrow.gif';
import leftArrow from '../icons/left-arrow.gif';
import upArrow from '../icons/up-arrow.gif';
import downArrow from '../icons/down-arrow.gif';
import './NavigationCross.css';

export default class NavigationCross extends React.Component {
    render(){
        let buttons = [];
        if (this.props.up != null) {
            buttons.push(<img src={upArrow} className="up-arrow"/>);
            buttons.push(<div className="up-arrow">{this.props.up}</div>);
        } else {
            buttons.push(<img src={upArrow} className="up-arrow invisible"/>);
        }
        if (this.props.down != null) {
            buttons.push(<img src={downArrow} className="down-arrow"/>);
            buttons.push(<div className="down-arrow">{this.props.down}</div>);
        } else {
            buttons.push(<img src={downArrow} className="down-arrow invisible"/>);
        }
        if (this.props.right != null) {
            buttons.push(<img src={rightArrow} className="right-arrow"/>);
            buttons.push(<div className="right-arrow">{this.props.right}</div>);
        } else {
            buttons.push(<img src={rightArrow} className="right-arrow invisible"/>);
        }
        if (this.props.left != null) {
            buttons.push(<img src={leftArrow} className="left-arrow"/>);
            buttons.push(<div className="left-arrow">{this.props.left}</div>);
        } else {
            buttons.push(<img src={leftArrow} className="left-arrow invisible"/>);
        }
        if (this.props.middle != null) {
            buttons.push(this.props.middle);
        }

        return (
            <div className="nav-cross">
                {buttons}
            </div>
        )
    }
}

import React from 'react';
import rightArrow from '../icons/right-arrow.gif';
import leftArrow from '../icons/left-arrow.gif';
import upArrow from '../icons/up-arrow.gif';
import downArrow from '../icons/down-arrow.gif';
import './NavigationCross.css';

export default class NavigationCross extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movement:'',
            targetView:'',
            command:''
        }
    }

    onAnimationEnd = () => {
        setTimeout(() => {
            if(this.state.targetView && this.state.targetView === 'room') {
                this.props.handleRoomChange();
            } else if(this.state.targetView && this.state.targetView.length !== 0) {
                this.props.handleViewChange(this.state.targetView);
            } else if(this.state.command && this.state.command.length !== 0) {
                this.props.handleStateChange(this.state.command);
            }
            // reset values for next change
            this.setState({movement:'', targetView:'', change:''});
        }, 500);
    }

    // TODO: Needs further refinement ot avoid memory leaks at later points, wasn't in the mood to tackle that now ^^
    // SEE: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    /*
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    */

    render(){
        let buttons = [];
        if (this.props.up != null) {
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

        return (
            <div className="nav-cross">
                {buttons}
                <div className="nav-middle"><svg width="150" height="150">
                    <rect onAnimationEnd={this.onAnimationEnd} className={this.state.movement} width="50" height="50" x="50" y="50" />
                </svg></div>
            </div>
        )
    }
}

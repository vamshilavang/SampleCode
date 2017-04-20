import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeFieldValue } from '../../../StateManagement/Forms/FormActions.js';
import { UIError } from '../FieldParts/UIError'

export class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment(this.props.formData[this.props.section][this.props.title], ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).isValid() ? moment(this.props.formData[this.props.section][this.props.title], ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).format('MM/DD/YYYY') : ''
        };
        // console.log(this.props)
    }

    componentWillMount() {
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });

    }

    handleBlur(e) {
        if(!e.target.value) {
        	this.props.dispatch(
            changeFieldValue({
                value: '',
                field: this.props.title,
                dependentFields: this.props.conf.attrs.dependentFields ? JSON.parse(this.props.conf.attrs.dependentFields) : '',
                section: this.props.section
            })
           );
           return
        };
        this.setState({
            value: moment(e.target.value, ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).isValid() ? moment(e.target.value, ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).format('MM/DD/YYYY') : ''
        });
        this.props.dispatch(
            changeFieldValue({
                value: moment(e.target.value, ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).isValid() ? moment(e.target.value, ['MM/DD/YYYY','M/D/YYYY', 'MMDDYYYY'], true).format('MM/DD/YYYY') : '',
                field: this.props.title,
                dependentFields: this.props.conf.attrs.dependentFields ? JSON.parse(this.props.conf.attrs.dependentFields) : '',
                section: this.props.section
            })
        );
    }

    render() {
        return (<div
            className={this.props.validations[this.props.section] && this.props.validations[this.props.section][this.props.title] ? "control-group error" : "control-group"}>
            <label className="control-label">{this.props.conf.label}</label>
            <div className="controls">
                <input type="text"
                  name={this.props.title}
                  id={this.props.title}
                  value={this.state.value}
                  placeholder='__/__/____'
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.handleBlur.bind(this)}
                  autoFocus={this.props.focus}
                />
            </div>
            {this.props.validations[this.props.section] && this.props.validations[this.props.section][this.props.title] ? <UIError errormsg={this.props.validations[this.props.section][this.props.title][0]} /> : ''}
        </div>);
    }
}

export default connect(
        state => ({
            formData: state.formData,
            validations: state.validations
        })
    )(DateField)

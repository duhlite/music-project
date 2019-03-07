import React, {Component} from 'react';

export default class MainSearch extends Component {
    render() {
        return (
            <div>
            <form>
                <div className='form-group'>
                    <label for='wordQuery'>Words</label>
                    <input
                        type='text'
                        className='form-control'
                        id='wordQuery'
                        />
                </div>
                <div className='form-group'>
                    <label for='songQuery'>Song Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='songQuery'
                        />
                </div>
                <div className='form-group'>
                    <label for='artistQuery'>Artist Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='artistQuery'
                        />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
            </div>
        )
    }
}
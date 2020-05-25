import React, { Component } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {

            this.requestInterceptor = axios.interceptors.request.use(Request => {
                this.setState({ error: null });
                return Request;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                Response => Response, Error => {
                    this.setState({ error: Error });
                }
            );
        }

        componentWillUnmount() {
            // console.log('Will unmount: ', this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxillary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            )
        }
    }
}

export default withErrorHandler;
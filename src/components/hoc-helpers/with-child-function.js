import React from 'react';

const withChildFunction = (childFunction) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {childFunction}
            </Wrapped>
        )
    }
}

export default withChildFunction;
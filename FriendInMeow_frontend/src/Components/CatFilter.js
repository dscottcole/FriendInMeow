import React from 'react'

const CatFilter = () => {
    return (
        <p>
            CatFilter
        </p>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.catState,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CatFilter);
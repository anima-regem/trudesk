/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Updated:    8/10/19, 12:39 AM
 *  Copyright (c) 2019 Trudesk, Inc. All rights reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import axios from 'api/axios'

class FormWithAuth extends React.Component {
  onSubmit (e) {
    e.preventDefault()
    const url = this.props.url
    const method = this.props.method
    const data = this.props.data
    const headers = this.props.headers

    if (this.props.onBeforeSend && typeof this.props.onBeforeSend === 'function') this.props.onBeforeSend(e)

    axios({
      url,
      method,
      data,
      headers: { ...headers }
    })
      .then(res => {
        if (this.props.onCompleted) this.props.onCompleted(res)
      })
      .catch(error => {
        if (this.props.onError) this.props.onError(error)
        throw error
      })
  }

  render () {
    const { children, onCompleted, onError, url, method, data, headers, ...rest } = this.props

    return (
      <form onSubmit={e => this.onSubmit(e)} {...rest}>
        {children}
      </form>
    )
  }
}

FormWithAuth.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  data: PropTypes.object,
  headers: PropTypes.object,
  children: PropTypes.any.isRequired,
  onCompleted: PropTypes.func.isRequired,FormWithAuth
  onError: PropTypes.func,
  onBeforeSend: PropTypes.func
}

export default FormWithAuth

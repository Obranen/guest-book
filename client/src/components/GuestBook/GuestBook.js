import React, {useCallback, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import Comments from "./Comments/Comments"
import {useValidation} from "../../hooks/validation.hook"
import './GuestBook.css'

const GuestBook = () => {
  const [form, setForm] = useState({firstName: '', message: ''})
  const [comments, setComments] = useState([])
  const inputMessage = useRef(null)
  const inputFirstName = useRef(null)
  const {errorFirstName, errorMessage, validationFirstName, validationMessage} = useValidation()

  const clearMassage = () => {
    inputMessage.current.value = ''
  }

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
    if (event.target.name === 'firstName') {
      validationFirstName({value: event.target.value})
    } else if (event.target.name === 'message') {
      validationMessage({value: event.target.value})
    }
  }

  const getComments = useCallback(async () => {
    const url = '/api/get'
    try {
      const comments = await axios.get(url)
      setComments(comments.data.comments)
    } catch (e) {
      console.log(e.response, "ошибка передачи данных")
    }
  }, [])

  useEffect(() => {
    getComments()
  }, [getComments])

  const addComments = async (e) => {
    const url = '/api/comment'
    try {
      const response = await axios.post(url, form)
      window.M.toast({html: response.data.message})
    } catch (e) {
      console.log(e.response.data.errors, "ошибка передачи данных")
    }
  }

  const submitMassage = () => {
    validationFirstName({value: inputFirstName.current.value})
    validationMessage({value: inputMessage.current.value})
    if (errorFirstName.state && errorMessage.state) {
      if (inputFirstName.current.value !== '' && inputMessage.current.value !== '') {
        addComments()
        getComments()
        clearMassage()
      }
    }
  }

  const keyPressHandler = event => {
    if (event.ctrlKey) {
      submitMassage()
    }
  }

  const sendCommentHandler = event => {
    event.preventDefault()
    submitMassage()
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col s12 m12">
          <h4 className={'main-title'}>
            <i className="material-icons main-title__icon">developer_board</i>
            <span className="main-title__text">Гостевая Книга</span>
          </h4>
        </div>

        <form className="col s12 m12 form">
          <div className="input-field col s12 m12 l3">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="icon_prefix"
              name="firstName"
              type="text"
              className="validate"
              required
              aria-required="true"
              ref={inputFirstName}
              onChange={changeHandler}
              onKeyPress={keyPressHandler}
            />
            {
              errorFirstName.state ?
                <div className="error-change-first-name">
                  {null}
                </div> :
                <div className="error-notification-wrap">
                  <div className="error-notification">
                    {errorFirstName.text || errorFirstName.regExpLetters}
                  </div>
                </div>
            }
            <label htmlFor="icon_prefix">Имя</label>
          </div>

          <div className="input-field col s12 m12 l7">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              id="icon_prefix2"
              name="message"
              className="materialize-textarea"
              required
              aria-required="true"
              ref={inputMessage}
              onChange={changeHandler}
              onKeyPress={keyPressHandler}
            ></textarea>
            {
              errorMessage.state ?
                <div className="error-change-first-name">
                  {null}
                </div> :
                <div className="error-notification-wrap">
                  <div className="error-notification">
                    {errorMessage.text || errorMessage.regExpLetters}
                  </div>
                </div>
            }
            <label htmlFor="icon_prefix2">Сообщение...</label>
          </div>

          <div className="input-field col s12 m12 l2 center-align form__send-wrapper">
            <button
              className="btn waves-effect waves-light form__send"
              onClick={sendCommentHandler}
            >Опубликовать
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>

        <div className="comments">
          <div className="col s12 m12">
            <h5 className={'center-align comments__title'}>
              <i className="material-icons comments__title-icon">notes</i>
              <span className={'comments__title-text'}>Комментарии</span>
            </h5>
          </div>

          {
            comments.length === 0 ?
              <div className="no-massage">
                <span className="no-massage__text">Вы можете стать первым кто оставит комментарий!</span>
              </div> :
            comments.map((comment, index) => {
              return (
                <Comments
                  key={index}
                  comment={comment}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default GuestBook
import {useState} from 'react'

export const useValidation = () => {
  const [errorFirstName, setErrorFirstName] = useState({})
  const [errorMessage, setErrorMessage] = useState({})

  const required = "Это обязательное поле для заполнения"
  const regExpLetters = "Допустимо: латинские буквы, цифры, знак нижнего подчеркивания"
  const regExp = /^[A-Za-z0-9 _]+$/


  const validationFirstName = ({value}) => {
    if (value === '') {
      setErrorFirstName({
        text: required,
        state: false,
      })
    } else {
      const massageLetters = value.match(regExp)
      if (!massageLetters) {
        setErrorFirstName({
          text: '',
          state: false,
          regExpLetters,
        })
      } else {
        setErrorFirstName({
          text: '',
          state: true,
        })
      }
    }
  }

  const validationMessage = ({value}) => {
    if (value === '') {
      setErrorMessage({
        text: required,
        state: false,
      })
    } else {
      const massageLetters = value.match(regExp)
      if (!massageLetters) {
        setErrorMessage({
          text: '',
          state: false,
          regExpLetters
        })
      } else {
        setErrorMessage({
          text: '',
          state: true,
        })
      }
    }
  }

  return {errorFirstName, errorMessage, validationFirstName, validationMessage}
}
const Router = require("express")
const router = new Router()
const Comment = require("../models/Comment")
const {validationResult} = require("express-validator")

router.post('/comment',
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Заполните все обязательные поля", errors})
      }
      const {firstName, message} = req.body
      const comment = new Comment({firstName, message})
      await comment.save()
      res.send({message: "Комментарий добавлен"})
    } catch (e) {
      console.log(e)
      res.send({message: "Ошибка при добавлении сообщения"})
    }
  })

router.get('/get',
  async (req, res) => {
  try {
    const comments = await Comment.find({}, 'firstName message').sort({date: -1}).select('-_id')
    return res.json({
      comments
    })
  } catch (e) {
    console.log(e)
  }
  })

module.exports = router
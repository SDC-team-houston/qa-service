module.exports = {
  answerQuestion: `
    INSERT INTO answers (
      question_id,
      body,
      date_written,
      answerer_name,
      answerer_email,
      reported,
      helpful
    )
    VALUES (
      $1, $2, NOW(), $3, $4, false, 0
    )
    RETURNING *`,
  answerPhoto: `
    INSERT INTO answers_photos (
      answer_id,
      url,
    )
    VALUES (
      $1, $2
    )
    RETURNING *`,
  markAnswerHelpful: `
    UPDATE answers
    SET helpful = helpful + 1
    WHERE id = $1
    RETURNING *`,
  reportAnswer: `
    UPDATE answers
    SET reported = true
    WHERE id = $1
    RETURNING *`,
}
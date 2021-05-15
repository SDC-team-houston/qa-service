module.exports = {
  getAll: `
    SELECT *,
    (
      SELECT (jsonb_agg(json_build_object(
        'id', answers.id,
        'question_id', answers.question_id,
        'body', answers.body,
        'date_written', answers.date_written,
        'answerer_name', answers.answerer_name,
        'answerer_email', answers.answerer_email,
        'helpful', answers.helpful,
        'photos',
          (
            SELECT (jsonb_agg(answers_photos.url)) AS photos
            FROM answers_photos
            WHERE answers_photos.answer_id = answers.id
          )
      ))) AS answers
      FROM answers
      WHERE question_id = questions.id AND answers.reported = false
    )
    FROM questions
    WHERE product_id = $1 AND questions.reported = false`,
  askQuestion: `
    INSERT INTO questions (
      product_id,
      body,
      date_written,
      asker_name,
      asker_email,
      reported,
      helpful
    )
    VALUES (
      $1, $2, NOW(), $3, $4, false, 0
    )
    RETURNING *`,
  markQuestionHelpful: `
    UPDATE questions
    SET helpful = helpful + 1
    WHERE id = $1
    RETURNING *`,
  reportQuestion: `
    UPDATE questions
    SET reported = true
    WHERE id = $1
    RETURNING *`,
}
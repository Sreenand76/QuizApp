package sreenand76_QuizApp.quizApp.controller;


import jakarta.validation.Valid;
import sreenand76_QuizApp.quizApp.Entity.Question;
import sreenand76_QuizApp.quizApp.service.IQuizService;
import sreenand76_QuizApp.quizApp.submission.QuizSubmission;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.springframework.http.HttpStatus.CREATED;



@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/quizzes")
public class QuestionController {
    private final IQuizService quizService;

    
    public QuestionController(IQuizService questionService) {
      this.quizService=questionService;
    }

    @PostMapping("/create-new-question")
    public ResponseEntity<List<Question>> createQuestions(@Valid @RequestBody List<Question> questions) {
        List<Question> createdQuestions = new ArrayList<>();

        questions.forEach(question -> {
            Question createdQuestion = quizService.createQuestion(question);
            createdQuestions.add(createdQuestion);
        });

        return ResponseEntity.ok(createdQuestions);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = quizService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = quizService.getQuestionById(id);
        if (theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id, @RequestBody Question question) throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion = quizService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        quizService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects = quizService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions, @RequestParam String subject){
    	List<Question> shuffledQuestions = quizService.getQuestionsForUser(numOfQuestions, subject);
        return ResponseEntity.ok(shuffledQuestions);
    }
    
    @PostMapping("/submit")
    public ResponseEntity<String> submitQuiz(@RequestBody QuizSubmission submission) {
        // Extract email and score from the DTO
        String userEmail = submission.getUserEmail();
        String subject=submission.getSubject();
        int correctAns=submission.getCorrectAnswer();
        int totalQns=submission.getTotalQns();
       
        quizService.saveQuizScore(userEmail, subject,correctAns,totalQns);

      
        return ResponseEntity.ok("Quiz submitted successfully. Score: " + correctAns+"/"+totalQns);
    }

}
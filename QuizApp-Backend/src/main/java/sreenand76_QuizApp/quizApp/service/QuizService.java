package sreenand76_QuizApp.quizApp.service;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sreenand76_QuizApp.quizApp.Entity.Question;
import sreenand76_QuizApp.quizApp.Entity.QuizScore;
import sreenand76_QuizApp.quizApp.repo.QuizRepository;
import sreenand76_QuizApp.quizApp.repo.QuizScoreRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService implements IQuizService{
    private final QuizRepository quizRepository;
    private final QuizScoreRepository quizScoreRepository;
    
    public QuizService(QuizRepository quizRepository,QuizScoreRepository quizScoreRepository) {
    	this.quizRepository=quizRepository;
    	this.quizScoreRepository=quizScoreRepository;
    }
    
    @Override
    public Question createQuestion(Question questions) {
        return quizRepository.save(questions);
    }


    @Override
    public List<Question> getAllQuestions() {
        return quizRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return quizRepository.findById(id);
    }

    @Override
    public List<String> getAllSubjects() {
        return quizRepository.findDistinctSubject();
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = this.getQuestionById(id);
        if (theQuestion.isPresent()){
            Question updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestion(question.getQuestion());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
            return quizRepository.save(updatedQuestion);
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }

    }
    
    @Override
    public void deleteQuestion(Long id) {
    	quizRepository.deleteById(id);
    }
    
    @Override
    public List<Question> getQuestionsForUser(Integer numOfQuestions, String subject) {
        
        List<Question> allQuestions = quizRepository.findBySubject(subject);
        
        
        Collections.shuffle(allQuestions);
        
        
        return allQuestions.stream().limit(numOfQuestions).collect(Collectors.toList());
    }

    
	@Override
	public void saveQuizScore(String userEmail, String subject,int score, int totalQns) {		
		QuizScore quizScore = new QuizScore(userEmail,subject,score,totalQns);
		 quizScoreRepository.save(quizScore);
	}
}

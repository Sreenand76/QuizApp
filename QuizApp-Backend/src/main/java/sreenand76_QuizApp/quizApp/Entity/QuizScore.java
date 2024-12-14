package sreenand76_QuizApp.quizApp.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_quiz_scores")
public class QuizScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(name = "attempt_date", nullable = false)
    private LocalDate attemptDate;
    
    @Column(name="subject")
    private String subject;
    
    @Column(name="correctAnswer")
    private int correctAnswer;
    
    @Column(name="totalQns")
    private int totalQns;
    
    
    // Constructors, getters, and setters
    public QuizScore() {}


	public QuizScore( String userEmail,  String subject, int correctAnswer,int totalQns) {
		super();
		this.userEmail = userEmail;
		this.attemptDate = LocalDate.now();
		this.subject = subject;
		this.correctAnswer = correctAnswer;
		this.totalQns = totalQns;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}


	public LocalDate getAttemptDate() {
		return attemptDate;
	}


	public void setAttemptDate(LocalDate attemptDate) {
		this.attemptDate = attemptDate;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public int getCorrectAnswer() {
		return correctAnswer;
	}


	public void setCorrectAnswer(int correctAnswer) {
		this.correctAnswer = correctAnswer;
	}


	public int getTotalQns() {
		return totalQns;
	}


	public void setTotalQns(int totalQns) {
		this.totalQns = totalQns;
	}
      
}

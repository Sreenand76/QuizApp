package sreenand76_QuizApp.quizApp.submission;

import java.time.LocalDate;

public class QuizSubmission{

    private String userEmail;      
    private LocalDate attemptDate;
    private String subject;
    private int correctAnswer;
    private int totalQns;
	
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

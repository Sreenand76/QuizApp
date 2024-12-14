package sreenand76_QuizApp.quizApp.service;

import java.util.List;

import sreenand76_QuizApp.quizApp.Entity.QuizScore;
import sreenand76_QuizApp.quizApp.Entity.User;


public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
	List<QuizScore> getUserRecentAttempts(String email);
	void updateUserRole(Long userId, String roleName) throws Exception;
}

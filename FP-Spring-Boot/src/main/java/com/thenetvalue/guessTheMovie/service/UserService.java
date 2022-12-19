package com.thenetvalue.guessTheMovie.service;

import com.thenetvalue.guessTheMovie.dao.UserRepository;
import com.thenetvalue.guessTheMovie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.regex.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Service
@ControllerAdvice
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<User> registerUser(User user) {

        //controllo sullo user
        if (findByUsernameLike(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        //controllo sulla mail
        if (!isValidEmail(user.getEmail()) || findByEmailLike(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        //controllo sulla password
        if (!isValidPassword(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        User resultUser = userRepository.save(user);

        if (resultUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(resultUser);
        }
    }

    public ResponseEntity<User> loginConvalidation(String username, String password) {
        User foundUser = userRepository.findByUsernameLike(username);
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else if (foundUser.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.OK).body(foundUser);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    public Iterable<User> allUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<User> updateUser(int id, User user) {
        user.setId(id);
        User resultUser = userRepository.save(user);
        if (resultUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(resultUser);
        }
    }

    public String deleteUser(int id) {
        User resultUser = userRepository.findById(id).get();

        if (resultUser == null) {
            return null;
        } else {
            userRepository.delete(resultUser);
            return resultUser.getUsername();
        }
    }

    public User findByUsernameLike(String username) {
        return userRepository.findByUsernameLike(username);
    }

    public Integer findIDByUsernameLike(String username) {
        return userRepository.findByUsernameLike(username).getId();
    }

    public User findByEmailLike(String email) {
        return userRepository.findByEmailLike(email);
    }

    public static boolean isValidPassword(String password) {

        String regex = "^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$%^&+=!?])"
                + "(?=\\S+$).{8,20}$";

        Pattern p = Pattern.compile(regex);

        if (password == null) {
            return false;
        }

        Matcher m = p.matcher(password);
        return m.matches();
    }

    public static boolean isValidEmail(String email) {

        String regex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(email);
        return m.matches();
    }
}

package com.thenetvalue.guessTheMovie.controller;

import com.thenetvalue.guessTheMovie.model.User;
import com.thenetvalue.guessTheMovie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200",
            allowCredentials = "true",
            methods = RequestMethod.POST)
    @PostMapping("/")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @CrossOrigin(origins = "http://localhost:4200",
            allowCredentials = "true",
            methods = RequestMethod.GET)
    @GetMapping("/login/{user}/{password}")
    public ResponseEntity<User> loginUser(@PathVariable("user") String user, @PathVariable("password") String password) {
        HttpStatus.values();
        return userService.loginConvalidation(user, password);
    }

    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/username/{username}")
    public User findByUsernameLike(@PathVariable("username") String username) {
        return userService.findByUsernameLike(username);
    }

    @CrossOrigin(origins = "http://localhost:4200",
            allowCredentials = "true",
            methods = RequestMethod.GET)
    @GetMapping("/IDusername/{username}")
    public Integer findIDByUsernameLike(@PathVariable("username") String username) {
        return userService.findIDByUsernameLike(username);
    }
}

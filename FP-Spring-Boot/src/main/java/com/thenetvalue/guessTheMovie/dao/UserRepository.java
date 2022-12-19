package com.thenetvalue.guessTheMovie.dao;

import com.thenetvalue.guessTheMovie.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository("dbUserDAO")
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsernameLike(String username);
    User findByEmailLike(String email);
}

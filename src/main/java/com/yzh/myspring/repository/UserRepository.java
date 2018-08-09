package com.yzh.myspring.repository;

import com.yzh.myspring.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}

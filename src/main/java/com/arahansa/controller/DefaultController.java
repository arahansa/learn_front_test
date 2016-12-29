package com.arahansa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.*;

/**
 * Created by jarvis on 2016. 12. 29..
 */
@Controller
public class DefaultController {

  @GetMapping("/")
  public String index(){
    return "index";
  }

  @GetMapping("/getRamdomColor")
  @ResponseBody
  public String makeRgb(){
    return new Random().ints(3, 0, 255)
            .mapToObj(i -> i)
            .map(Integer::toHexString)
            .collect(joining("", "#", ""));
  }


}

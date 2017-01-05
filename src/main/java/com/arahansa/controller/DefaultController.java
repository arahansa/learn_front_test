package com.arahansa.controller;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@Controller
public class DefaultController {

  @GetMapping("/")
  public String index(){
    return "index";
  }

  @GetMapping("/index2")
  public String index2(){return "index2";}

  @GetMapping("/es6")
  public String es6(){return "es6";}

  @GetMapping("/getRamdomColor")
  @ResponseBody
  public String makeRgb(){
    log.info("make color...");
    return new Random().ints(3, 0, 255)
            .mapToObj(i -> i)
            .map(Integer::toHexString)
            .collect(joining("", "#", ""));
  }


}

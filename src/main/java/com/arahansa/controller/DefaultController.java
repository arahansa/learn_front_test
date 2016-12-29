package com.arahansa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by jarvis on 2016. 12. 29..
 */
@Controller
public class DefaultController {
  @GetMapping("/")
  public String index(){
    return "index";
  }
}

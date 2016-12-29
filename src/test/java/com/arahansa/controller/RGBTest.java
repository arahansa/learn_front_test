package com.arahansa.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Random;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * Created by jarvis on 2016. 12. 29..
 */
public class RGBTest {

  // 아 왜 이거 뜨지 No tests found matching Method colorTest
  @Test
  public void makeColorTest() throws Exception{
    final String collect = new Random().ints(3, 0, 255).mapToObj(i -> i).map(Integer::toHexString).collect(Collectors.joining("", "#", ""));
    System.out.println(collect);
    assertEquals(collect.length(), 7);
    assertTrue(collect.startsWith("#"));
  }

}
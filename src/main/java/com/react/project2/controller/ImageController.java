package com.react.project2.controller;

import com.react.project2.dto.ImageDTO;
import com.react.project2.util.FileUtilCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final FileUtilCustom fileUtil;

    // 이미지 업로드
    @PostMapping("/upload")
    public String uploadImage(ImageDTO imageDTO) {
        log.info("************ ImageController - uploadImage -file : {}", imageDTO.getFile());
        String fileName =  fileUtil.saveFile(imageDTO.getFile());
        log.info("************ ImageController - uploadImage -fileName : {}", fileName);
        return fileName;
    }

    // 이미지 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable("fileName") String fileName) {
        return fileUtil.getFile(fileName);
    }
}

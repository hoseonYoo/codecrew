package com.react.project2.util;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class FileUtilCustomTest {

    @Autowired
    private FileUtilCustom fileUtilCustom;

    public MultipartFile convert(File file) {
        MultipartFile multipartFile = null;
        try {
            multipartFile = new MockMultipartFile(
                    file.getName(),
                    file.getName(),
                    Files.probeContentType(file.toPath()),
                    Files.readAllBytes(file.toPath())
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        return multipartFile;
    }
    @Test
    void testFileinput() {

        // upload 폴더 안의 파일들 multipartFile로 변환
        //TODO 파일 주소 수정
        File folder = new File("C:\\Users\\comej\\IdeaProjects\\project2\\upload\\studyImg");
        File[] files = folder.listFiles();
        MultipartFile[] multipartFiles = new MultipartFile[files.length];
        for (int i = 0; i < files.length; i++) {
            multipartFiles[i] = convert(files[i]);
        }
        // 파일들을 저장
        for (MultipartFile multipartFile : multipartFiles) {
            String saveFile = fileUtilCustom.saveFile(multipartFile);
            log.info("saveFile : {}", saveFile);
        }
    }

}
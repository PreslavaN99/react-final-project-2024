package com.animals.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

  private static final String URL = "url";

  private final Cloudinary cloudinary;

  public String uploadImage(MultipartFile multipartFile) throws IOException {
    return cloudinary.uploader()
        .upload(multipartFile.getBytes(), Collections.emptyMap())
        .get(URL).toString();
  }

  @SuppressWarnings("unchecked")
  public Map<String, Object> deleteImage(String id) throws IOException {
    return cloudinary.uploader().destroy(id, Collections.emptyMap());
  }
}

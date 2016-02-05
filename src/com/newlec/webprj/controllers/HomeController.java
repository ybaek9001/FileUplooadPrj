package com.newlec.webprj.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class HomeController {
	@RequestMapping("/")
	public String index(Model model){
		model.addAttribute("data","어항님");
		return "index";
	}
	
	@RequestMapping("/fileupload")
	@ResponseBody
	public String fileupload(MultipartFile file, HttpServletRequest request)throws IOException{
			//파일을 저장할 디렉토리와 경로 설정
			ServletContext context = request.getServletContext();
			String rootPath = context.getRealPath("/content/")+"\\upload";
			
			File f = new File(rootPath);
			if (!f.exists()) {
				if (f.mkdir()) {
					System.out.println("Directory is created!!");
				} else {
					System.out.println("Failed to create directory!");
				}
			}
			
			//전송된 파일을 저장하는 로직
			String fileName = file.getOriginalFilename();
			byte[] buf = file.getBytes();
			
			//저장할 파일이 있는지 없는지 검사를 해야만 하지만 수업에서 생략했음
			FileOutputStream fout = new FileOutputStream(rootPath+File.separator+fileName); //File.separator == "\\"
			fout.write(buf);
			fout.close();
			
			//return "You successfully uploaded file=" + rootPath+File.separator+fileName;
			//return "redirect:../content/javascript/app/views/fileupload.html";
		
		return rootPath;
	}

}

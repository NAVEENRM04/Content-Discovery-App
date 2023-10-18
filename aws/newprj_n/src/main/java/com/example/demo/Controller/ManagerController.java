package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.UpdateStatusDto;
import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/api/management")
//@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasAuthority('MANAGER')")
@CrossOrigin
public class ManagerController {
	
	@Autowired
	private UserService ss;
	
	@GetMapping("/GetActiveUserForManager")
	@PreAuthorize("hasAuthority('manager_Read')")
	public List<User> GetActiveUserForManager() {
		System.out.println("manager user");
		return ss.findByActiveRoleForManager();
	}
	@PutMapping("/updateActiveStatus")
	@PreAuthorize("hasAuthority('manager:update')")
	public String updateActiveStatus(@RequestBody UpdateStatusDto dto) {
		User user = ss.findByUsername(dto.getUserName());
		System.out.println(user);
		if (dto.getIsactive() == 1) {
			user.setIsactive(true);
		} else if (dto.getIsactive() ==0)
			user.setIsactive(false);
		System.out.println(user);
		ss.updateData(user);
		return "active status updated";
	}
	@GetMapping("/getUserOfBan")
	@PreAuthorize("hasAuthority('manager_Read')")
	public List<User> getUserOfBan()
	{
		return ss.findByBannedUser();
		
	}

}

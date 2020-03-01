package com.coolGroup.org.services;

import com.coolGroup.org.config.Mapper;
import com.coolGroup.org.models.Enrollment;
import com.coolGroup.org.models.Module;
import com.coolGroup.org.models.Student;
import com.coolGroup.org.models.dtos.ModuleForStudentDto;
import com.coolGroup.org.repositories.EnrollmentRepository;
import com.coolGroup.org.repositories.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService implements IEnrollmentService {
    private EnrollmentRepository enrollmentRepository;
    private IModuleService moduleService;
    private StudentRepository studentRepository;

    @Autowired
    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             IModuleService moduleService, StudentRepository studentRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.moduleService = moduleService;
        this.studentRepository = studentRepository;
    }

    @Override
    public Iterable<Enrollment> get() {
        return this.enrollmentRepository.findAll();
    }

    @Override
    public Enrollment get(Integer id) {
        return this.enrollmentRepository.getOne(id);
    }

    @Override
    public void delete(Integer id) {
        this.enrollmentRepository.deleteEnrollmentById(id);
    }

    @Override
    public List<Enrollment> getEnrollmentForStudent(Integer studentId) {
        Optional<List<Enrollment>> enrollments = this.enrollmentRepository
                .findAllByStudent(studentId);

        return enrollments.orElse(null);
    }

    @Override
    public List<Enrollment> getEnrollmentForModule(Integer moduleId) {
        Optional<List<Enrollment>> enrollments = this.enrollmentRepository
                .findAllByModule(moduleId);

        return enrollments.orElse(null);
    }

    @Override
    public Enrollment getEnrollmentForStudentAndModule(Integer studentId, Integer moduleId) {
        Optional<Enrollment> enrollment = this.enrollmentRepository
                .findByStudentAndModule(studentId, moduleId);

        return enrollment.orElse(null);
    }

    @Override
    public Enrollment assignGrade(Integer student, Integer module, String grade) {
        Enrollment existingEnrollment = getEnrollmentForStudentAndModule(student, module);
        Enrollment result = null;

        if (existingEnrollment != null) {
            Enrollment newEnrollment = new Enrollment(student, module, grade);
            BeanUtils.copyProperties(newEnrollment, existingEnrollment, "id");
            result = this.enrollmentRepository.saveAndFlush(existingEnrollment);
        }

        return result;
    }

    @Override
    public Enrollment enroll(Integer studentId, Integer moduleId) {
        // If null is returned, the module is full
        Enrollment newEnrollment = null;
        if (this.moduleService.hasRoom(moduleId)) {
            this.moduleService.addStudent(moduleId);
            Optional<Enrollment> enrollment = enrollmentRepository
                    .findByStudentAndModule(studentId, moduleId);
            Enrollment result = enrollment.orElseGet(() -> new Enrollment(studentId, moduleId));
            newEnrollment = this.enrollmentRepository.saveAndFlush(result);
        }
        return newEnrollment;
    }

    @Override
    public Enrollment unenroll(Integer studentId, Integer moduleId) {
        // If null is returned, the student wasn't enrolled
        Optional<Enrollment> enrollment = enrollmentRepository
                .findByStudentAndModule(studentId, moduleId);

        enrollment.ifPresent(e -> {
            this.enrollmentRepository.delete(e);
            this.moduleService.removeStudent(moduleId);
        });
        return enrollment.orElse(null);
    }

    @Override
    public List<ModuleForStudentDto> getModulesForStudent(Integer student) {
        Optional<List<Enrollment>> enrollments = this.enrollmentRepository.findAllByStudent(student);
        List<ModuleForStudentDto> result = new ArrayList<>();
        List<Module> modules = new ArrayList<>();

        if (enrollments.isPresent()) {
            for (Enrollment enrollment : enrollments.get()) {
                Integer moduleId = enrollment.getModule();
                Module module = this.moduleService.get(moduleId);
                modules.add(module);
            }
            result = Mapper.mapModulesForStudent(enrollments.get(), modules);
        }
        
        return result;
    }

    @Override
    public List<Student> getStudentsForModule(Integer module) {
        Optional<List<Enrollment>> enrollments = this.enrollmentRepository.findAllByModule(module);
        List<Student> students = new ArrayList<>();

        if (enrollments.isPresent()) {
            for (Enrollment enrollment : enrollments.get()) {
                Integer studentId = enrollment.getStudent();
                Student student = this.studentRepository.getOne(studentId);
                students.add(student);
            }
        }

        return students;
    }
}

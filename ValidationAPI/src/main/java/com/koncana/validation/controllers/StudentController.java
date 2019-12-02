//package com.koncana.validation.controllers;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//
//import javax.annotation.PostConstruct;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.koncana.validation.entity.dao.IStudent;
//import com.koncana.validation.entity.models.Student;
//
//import graphql.ExecutionResult;
//import graphql.GraphQL;
//import graphql.schema.DataFetcher;
//import graphql.schema.GraphQLSchema;
//import graphql.schema.idl.RuntimeWiring;
//import graphql.schema.idl.SchemaGenerator;
//import graphql.schema.idl.SchemaParser;
//import graphql.schema.idl.TypeDefinitionRegistry;
//
//@RestController
//public class StudentController {
//
//	@Autowired
//	private IStudent repository;
//
//	@Value("classpath:schema.graphqls")
//	private Resource schemaResource;
//
//	private GraphQL graphQL;
//
//	@PostConstruct
//	public void loadSchema() throws IOException {
//		File schemaFile = schemaResource.getFile();
//		TypeDefinitionRegistry registry = new SchemaParser().parse(schemaFile);
//		RuntimeWiring wiring = buildWiring();
//		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
//		graphQL = GraphQL.newGraphQL(schema).build();
//	}
//
//	private RuntimeWiring buildWiring() {
//		DataFetcher<List<Student>> fetcher1 = data -> {
//			return (List<Student>) repository.findAll();
//		};
//
//		DataFetcher<Student> fetcher2 = data -> {
//			return repository.findByDni(data.getArgument("dni"));
//		};
//
//		return RuntimeWiring.newRuntimeWiring().type("Query",
//				typeWriting -> typeWriting.dataFetcher("getAllStudents", fetcher1).dataFetcher("findStudent", fetcher2))
//				.build();
//	}
//
//	@PostMapping("/addStudent")
//	public String addStudent(@RequestBody List<Student> students) {
//		repository.saveAll(students);
//		return "record inserted" + students.size();
//	}
//
//	@GetMapping("/findAllStudents")
//	public List<Student> getStudents() {
//		return (List<Student>) repository.findAll();
//	}
//
//	@PostMapping("/getStudent")
//	public ResponseEntity<Object> getStudent(@RequestBody String dni) {
//		ExecutionResult result = graphQL.execute(dni);
//		return new ResponseEntity<Object>(result, HttpStatus.OK);
//	}
//
//}

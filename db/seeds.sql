INSERT INTO department (name)
VALUES ("Sales"),
    ("Finance"),
    ("Engineering"),
    ("HR");

INSERT INTO role (title, salary, department_id) 
VALUES ("Software Engineer", 120000, 3),
    ("Accountant", 130000, 2),
    ("HR Person", 100000, 4),
    ("Sales Lead", 120000, 1),
    ("Hardware Engineer", 130000, 3),
    ("Salesperson", 110000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Doe", 4, null),
    ("Greg", "Smith", 1, 1),
    ("Harrison", "Pint", 2, null);
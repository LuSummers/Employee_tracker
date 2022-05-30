INSERT INTO department (id, name)
VALUES
  ('1', 'Maintenance'),
  ('2', 'Engineering'),
  ('3', 'Tech Support');
							 
INSERT INTO role (id, title, salary, department_id)
VALUES
  ('1', 'executive', '200000', '2'),
  ('2', 'technician', '50000','3'),
  ('3', 'Bruce', '70000', '2');
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Giant', 1, 1),
  ('Tiki', 'Barber', 1, 1),
  ('Piers', 'Morgan', 1, 0);

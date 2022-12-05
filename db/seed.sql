USE employees;

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Legal'),
    ('Finance');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Head Engineer', 125000, 1),
    ('Engineer', 90000, 1),
    ('Legal Lead', 200000, 2),
    ('Paralegal', 100000, 2),
    ('Account Manager', 150000, 3),
    ('Accountant', 95000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jack', 'Jones', 1, NULL),
    ('Garrett', 'Jackson', 2, 1),
    ('Bucky', 'Farse', 2, 1),
    ('Victoria', 'Worthington', 3, NULL),
    ('Allison', 'Steili', 4, 4),
    ('Tim', 'Allen', 5, NULL),
    ('Randy', 'Armor', 6, 6);
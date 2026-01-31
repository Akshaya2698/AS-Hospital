USE ASHospital

CREATE TABLE Doctors 
(
	Id INT NOT NULL IDENTITY(101, 1),
	Name VARCHAR(200) NOT NULL,
	Photo VARCHAR(200),
	Specializtion VARCHAR(500),
	Designation VARCHAR(500),
	Email VARCHAR(500),
	Phonenumber VARCHAR(10),
	Password VARCHAR(100),
	CONSTRAINT pk_id PRIMARY KEY(Id)
)

SELECT * FROM Doctors

INSERT INTO Doctors(Name,Photo,Specializtion,Designation,Email,Phonenumber,Password) VALUES 
('Akshaya', '/images/femaledoc1.jpg', 'Child & Adolescent Psychiatry', 'Psy.D. (Clinical Psychology)', 'ak@gmail.com', '8300629829', 'As@2621'),
('Sriram', '/images/maledoc1.jpg', 'Family Counselling', 'Ph.D. (Counselling Psychology)', 'sri@gmail.com', '9445257520', 'Sa@2621'),
('S', '/images/maledoc2.jpg', 'School Psychologist', 'Ph.D. (Clinical Psychology)', 's@gmail.com', '1111111111', 'aS@2621'),
('Sriya', '/images/femaledoc2.jpg', 'Geriatric Psychiatry', 'M.D.', 'a@gmail.com', '2222222222', 'sA@2621'),
('AS', '/images/maledoc3.jpg', 'Couple Counselling', 'Ph.D. (Clinical Psychology)', 'as143@gmail.com', '5555555555', 'AS@2621'),
('Riya', '/images/femaledoc3.jpg', 'General Adult Psychiatry', 'M.D.', 'riya@gmail.com', '6666666666', 'aksr@2621'),
('Akshu', '/images/femaledoc4.jpg', 'Neuropsychologist', 'Ph.D.', 'akshusri@gmail.com', '7777777777', 'Sriram@2621'),
('Ram', '/images/maledoc4.jpg', 'Addiction Psychiatry', 'D.O.', 'ram@gmail.com', '8888888888', 'Akshaya@2621')

CREATE TABLE Clients
(
	Id INT NOT NULL IDENTITY(1,1),
	FirstName VARCHAR(200) NOT NULL,
	LastName VARCHAR(200),
	Gender VARCHAR(10) NOT NULL,
	Age INT NOT NULL,
	Phonenumber VARCHAR(10),
	Location VARCHAR(500),
	Email VARCHAR(100),
	Password VARCHAR(100),
	Diagnosis VARCHAR(1000),
	ReportingDoctorId INT NOT NULL,
	ReportingDoctor VARCHAR(200),
	StartDate DATE,
	LastReview DATE,
	PrevActionTaken VARCHAR(MAX),
	PrevAssignedTask VARCHAR(MAX),
	ActionTaken VARCHAR(1000),
	AssignedTask VARCHAR(1000),
	NextReview DATE,
	CONSTRAINT pk_ClientId PRIMARY KEY(Id),
	CONSTRAINT fk_DoctorId FOREIGN KEY(ReportingDoctorId) REFERENCES Doctors(Id)
)

ALTER TABLE Clients ADD TaskContent VARCHAR(MAX)
ALTER TABLE Clients ADD TaskStatus VARCHAR(10)
ALTER TABLE Clients ALTER COLUMN Phonenumber VARCHAR(10) NOT NULL
ALTER TABLE Clients ALTER COLUMN Location VARCHAR(500) NOT NULL
ALTER TABLE Clients ALTER COLUMN Email VARCHAR(100) NOT NULL
ALTER TABLE Clients ALTER COLUMN Password VARCHAR(100) NOT NULL
ALTER TABLE Clients ALTER COLUMN ReportingDoctorId INT NULL

ALTER TABLE Clients DROP COLUMN TaskContent 
ALTER TABLE Clients DROP COLUMN TaskStatus 

SELECT * FROM Clients

INSERT INTO Clients(FirstName, LastName, Gender, Age, Phonenumber, Location, Email, Password, Diagnosis, ReportingDoctorId, ReportingDoctor, StartDate, LastReview, PrevActionTaken, PrevAssignedTask, ActionTaken, AssignedTask, NextReview) VALUES
('Sriram','','Male','26','8667808505','Kanchipuram','sri@gmail.com','As@2621','Anger Issues',101,'Akshaya','2025-Oct-12','2025-Oct-24', '', '','State-Trait Anger Expression Inventory (STAXI) completed','Practice Meditation and perform Muscle Relaxation Techniques','2025-Nov-07'),
('Akshaya','Sriram','Female','26','6381660034','Chennai','akshu@gmail.com','Sa@2621','Obsessive-Compulsive Disorder (OCD)',105,'AS','2025-Aug-10','2025-Oct-09', '', '', 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS) completed, Review of the client''s improvement and difficulties.','Practice Meditation and perform Stress management techniques like Yoga, Workout, Mindfulness','2025-Nov-07'),
('Raj','Mohan','Male','26','9999999999','Thiruvallur','raj@gmail.com','aA@2','Obsessive-Compulsive Disorder (OCD)',102,'Sriram','2025-Aug-10','2025-Oct-09', '', '', 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS) completed, Review of the client''s improvement and difficulties.','Practice Meditation and perform Stress management techniques like Yoga, Workout, Mindfulness','2025-Nov-07'),
('John','','Male','26','1212121212','Chennai','john@gmail.com','asAS!2126','Anger Issues',105,'AS','2025-Oct-12','2025-Oct-24', '', '', 'State-Trait Anger Expression Inventory (STAXI) completed','Practice Meditation and perform Muscle Relaxation Techniques','2025-Nov-07')

INSERT INTO Clients(FirstName, LastName, Gender, Age, Phonenumber, Location, Email, Password, Diagnosis, ReportingDoctorId, ReportingDoctor, StartDate, LastReview, PrevActionTaken, PrevAssignedTask, ActionTaken, AssignedTask, NextReview) VALUES
('Swetha','','Female','32','1010101010','Chennai','swetha123@gmail.com','zZ@1','',NULL,'','2025-Nov-03','','','','', '', '')

DROP TABLE Clients

CREATE TABLE Facilities
(
	Name VARCHAR(300) NOT NULL,
	Photo VARCHAR(300) NOT NULL,
	Description VARCHAR(1000) NOT NULL
)

SELECT * FROM Facilities

INSERT INTO Facilities VALUES
('Family Counselling', '/images/familycoun.jpg', 'Addressing challenges in family dynamics, communication breakdowns, parental conflicts, behavioral issues in children, and major life transitions (e.g., divorce, loss).'),
('Couples Counselling', '/images/couplecoun.jpg', 'Managing conflict, rebuilding trust, addressing infidelity, improving sexual and emotional intimacy, and navigating life stage changes.'),
('Career & Stress Management', '/images/Career&StressManagementCounsellingcoun.jpg', 'The practice of using strategies to reduce stress in the workplace and maintain a healthy work-life balance, which in turn enhances career growth, productivity, and well-being. It involves identifying stressors, developing coping mechanisms like time management and mindfulness, and creating a supportive environment to minimize the negative impacts of work-related pressure.'),
('Trauma-Informed Care (Individual)', '/images/traumacoun.jpg', 'Treating Post-Traumatic Stress Disorder (PTSD), Complex Trauma, or recovering from emotional/physical abuse.'),
('Anxiety & Mood Disorder Counselling', '/images/anxietycoun.jpg', 'Treating conditions like Generalized Anxiety Disorder (GAD), Social Anxiety, Panic Disorder, Major Depressive Disorder (MDD), and Bipolar Disorder.'),
('Youth & Adolescent Counselling', '/images/youthcoun.jpg', 'Dealing with academic stress, bullying, peer pressure, body image issues, emerging identity concerns, and family conflicts typical during adolescence.'),
('Substance Abuse & Addiction Counselling', '/images/substancecoun.jpg', 'Addressing misuse of substances (alcohol, drugs), behavioral addictions (gambling, gaming), developing coping mechanisms for cravings, and relapse prevention.')

CREATE TABLE FAQ
(
	Question VARCHAR(1000) NOT NULL,
	Answer VARCHAR(1000) NOT NULL
)

SELECT * FROM FAQ

INSERT INTO FAQ VALUES
('Is my data kept private and confidential?', 'Absolutely. We use industry-standard encryption protocols (like HIPAA/GDPR compliance) to ensure all personal inputs, session data, and mood logs are encrypted and stored securely. We do not sell or share your data with third parties.'),
('Is the communication with therapists/coaches secure?', 'Yes. All communication within the app uses end-to-end encryption to ensure that only you and your designated professional can access your messages and video sessions.'),
('What should I do in a mental health crisis or emergency?', 'This app is NOT for emergencies. If you are experiencing a mental health crisis, please immediately call 911 (or your local emergency number) or visit your nearest emergency room.'),
('Does my health insurance cover the subscription cost?', 'Most wellness apps are not covered by standard health insurance. However, some Flexible Spending Accounts (FSA) or Health Savings Accounts (HSA) may cover the cost. Please check with your provider.'),
('What are the main benefits?', 'Teletherapy offers great convenience (attending from home), accessibility (especially for those in rural areas or with mobility issues), and often reduced costs (saving on travel and childcare).')

CREATE TABLE WhatsEveryOneSaying
(
	Content VARCHAR(1000),
	Rating INT
)

SELECT * FROM WhatsEveryOneSaying

INSERT INTO WhatsEveryOneSaying VALUES
('I was completed impressed with their professionalism and highly reccomend this.', 10),
('Best doctors to get immediate help.', 8),
('Loved their service and the care they took on their clients.', 10)

CREATE TABLE Pharmacy
(
	Name VARCHAR(100),
	OperatingHours VARCHAR(100),
	Contact INT,
	Location VARCHAR(100)
)

SELECT * FROM Pharmacy

ALTER TABLE Pharmacy ALTER COLUMN Contact VARCHAR(10)

INSERT INTO Pharmacy VALUES
('ABC Pharmacy', 'Mon-Fri : 6:00 AM - 8:00 PM', '9876543210', 'Porur, Chennai'),
('XYZ Medicals', 'Mon-Sun : 10:00 AM - 10:00 PM', '1234567890', 'Ashok Nagar, Chennai'),
('CMC Medicals', 'Mon-Fri : 6:00 AM - 8:00 PM', '9988771122', 'K.K.Nagar, Chenna'),
('Bhama Pharmacy', 'Mon-Fri : 6:00 AM - 8:00 PM', '1352467890', 'Valasaravakkam, Chennai'),
('URS Medi', 'Mon-Sun : 11:00 AM - 8:00 PM', '3355778809', 'Porur, Chennai'),
('Hospital Buddy', 'Mon-Sat : 10:00 AM - 6:00 PM', '9090898978', 'Ashok Nagar, Chennai'),
('PNC Medicals', 'Mon-Fri : 6:00 AM - 8:00 PM', '2463578967', 'T.Nagar, Chennai'),
('Ganga Pharmacy', 'Mon-Sun : 10:00 AM - 10:00 PM', '9887766554', 'Anna Nagar, Chennai')

CREATE TABLE TaskDetails
(
	TaskId INT NOT NULL IDENTITY(1,1),
	ClientId INT,
	DoctorId INT,
	TaskDate DATE,
	TaskContent VARCHAR(MAX),
	TaskStatus VARCHAR(20) DEFAULT 'Not Completed'
)

SELECT * FROM TaskDetails

INSERT INTO TaskDetails(ClientId, DoctorId, TaskDate, TaskContent) VALUES
(101, 105, '2025-Nov-17', '')

UPDATE TaskDetails 
SET TaskStatus='Completed'
WHERE TaskContent <> ''

INSERT INTO TaskDetails(ClientId, DoctorId, TaskDate, TaskContent) VALUES
(102, 105, '2025-Nov-17', 'Did meditation and yoga for about an hour')

INSERT INTO TaskDetails(ClientId, DoctorId, TaskDate, TaskContent) VALUES
(103, 105, '2025-Nov-17', 'Did meditation and yoga for about an hour')

ALTER TABLE TaskDetails ADD CONSTRAINT pk_taskid PRIMARY KEY(TaskId)

CREATE TABLE Appointments
(
	Id INT NOT NULL IDENTITY(1,1),
	ClientId INT,
	DoctorId INT,
	LastReviewDate DATE,
	ReviewDate DATE,
	PrevPlannedDate DATE,
	Slot VARCHAR(25),
	DaysNotSubmitted INT,
	ReviewStatus VARCHAR(20),
	CONSTRAINT pk_appointmentid PRIMARY KEY(Id)
)

SELECT * FROM Appointments

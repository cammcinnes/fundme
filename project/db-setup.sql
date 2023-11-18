DROP TABLE Account CASCADE CONSTRAINTS;
DROP TABLE PostalCode_Location CASCADE CONSTRAINTS;
DROP TABLE PaymentInformation CASCADE CONSTRAINTS;
DROP TABLE Individual CASCADE CONSTRAINTS;
DROP TABLE Organization CASCADE CONSTRAINTS;
DROP TABLE Organization_creates_Project CASCADE CONSTRAINTS;
DROP TABLE Organization_creates_Post CASCADE CONSTRAINTS;
DROP TABLE Account_writes_Comment_on_Post CASCADE CONSTRAINTS;
DROP TABLE Individual_makes_Contribution CASCADE CONSTRAINTS;
DROP TABLE Reward CASCADE CONSTRAINTS;
DROP TABLE Individual_receives_Reward CASCADE CONSTRAINTS;
DROP TABLE PaymentTier CASCADE CONSTRAINTS;
DROP TABLE PaymentTier_has_Reward CASCADE CONSTRAINTS;

CREATE TABLE Account
(
    Username     VARCHAR(50) PRIMARY KEY,
    Password     VARCHAR(50)        NOT NULL,
    CreationDate DATE,
    Email        VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE PostalCode_Location
(
    PostalCode CHAR(6) PRIMARY KEY,
    City       VARCHAR(50) NOT NULL,
    Province   VARCHAR(50) NOT NULL
);

CREATE TABLE PaymentInformation
(
    CCNumber   CHAR(16) PRIMARY KEY,
    CVV        CHAR(3)     NOT NULL,
    Address    VARCHAR(50) NOT NULL,
    PostalCode CHAR(6)     NOT NULL,
    FOREIGN KEY (PostalCode) REFERENCES PostalCode_Location (PostalCode)
);

CREATE TABLE Individual
(
    Username    VARCHAR(50) PRIMARY KEY,
    PaymentInfo CHAR(16),
    DateOfBirth DATE,
    FirstName   VARCHAR(50),
    LastName    VARCHAR(50),
    FOREIGN KEY (Username) REFERENCES Account (Username) ON DELETE CASCADE,
    FOREIGN KEY (PaymentInfo) REFERENCES PaymentInformation (CCNumber) ON DELETE SET NULL
);

CREATE TABLE Organization
(
    Username    VARCHAR(50) PRIMARY KEY,
    FoundedDate DATE,
    OrgName     VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (Username) REFERENCES Account (Username) ON DELETE CASCADE
);

CREATE TABLE Organization_creates_Project
(
    ProjectName VARCHAR(50) PRIMARY KEY,
    OUsername   VARCHAR(50) NOT NULL,
    Description VARCHAR(200),
    Name        VARCHAR(100),
    Balance     INT         NOT NULL,
    FOREIGN KEY (OUsername) REFERENCES Organization (Username)
);

CREATE TABLE Organization_creates_Post
(
    PostID      INT PRIMARY KEY,
    OUsername   VARCHAR(50)  NOT NULL,
    ProjectName VARCHAR(50)  NOT NULL,
    Content     VARCHAR(600) NOT NULL,
    ImageURL    VARCHAR(200),
    Timestamp   TIMESTAMP,
    FOREIGN KEY (OUsername) REFERENCES Organization (Username),
    FOREIGN KEY (ProjectName) REFERENCES Organization_creates_Project (ProjectName) ON DELETE CASCADE
);

CREATE TABLE Account_writes_Comment_on_Post
(
    CommentID INT PRIMARY KEY,
    Username  VARCHAR(50)  NOT NULL,
    PostID    INT          NOT NULL,
    Timestamp TIMESTAMP,
    Content   VARCHAR(200) NOT NULL,
    FOREIGN KEY (Username) REFERENCES Account (Username) ON DELETE CASCADE,
    FOREIGN KEY (PostID) REFERENCES Organization_creates_Post (PostID) ON DELETE CASCADE
);

CREATE TABLE Individual_makes_Contribution
(
    IUsername   VARCHAR(50),
    ProjectName VARCHAR(50) NOT NULL,
    Amount      INT         NOT NULL,
    Timestamp   TIMESTAMP,
    PRIMARY KEY (IUsername, Amount, Timestamp),
    FOREIGN KEY (IUsername) REFERENCES Individual (Username),
    FOREIGN KEY (ProjectName) REFERENCES Organization_creates_Project (ProjectName) ON DELETE CASCADE
);

CREATE TABLE Reward
(
    RewardName VARCHAR(50),
    OUsername  VARCHAR(50),
    PRIMARY KEY (RewardName),
    FOREIGN KEY (OUsername) REFERENCES Organization (Username) ON DELETE CASCADE
);

CREATE TABLE Individual_receives_Reward
(
    RewardName VARCHAR(50),
    IUsername  VARCHAR(50),
    PRIMARY KEY (RewardName, IUsername),
    FOREIGN KEY (RewardName) REFERENCES Reward (RewardName),
    FOREIGN KEY (IUsername) REFERENCES Individual (Username) ON DELETE CASCADE
);

CREATE TABLE PaymentTier
(
    PayTierID   INT PRIMARY KEY,
    ProjectName VARCHAR(50) NOT NULL,
    OUsername   VARCHAR(50) NOT NULL,
    Description VARCHAR(100),
    minAmount   INT         NOT NULL,
    maxAmount   INT         NOT NULL,
    FOREIGN KEY (ProjectName) REFERENCES Organization_creates_Project (ProjectName) ON DELETE CASCADE,
    FOREIGN KEY (OUsername) REFERENCES Organization (Username) ON DELETE CASCADE
);

CREATE TABLE PaymentTier_has_Reward
(
    PayTierID  INT,
    RewardName VARCHAR(50),
    PRIMARY KEY (PayTierID, RewardName),
    FOREIGN KEY (PayTierID) REFERENCES PaymentTier (PayTierID) ON DELETE CASCADE,
    FOREIGN KEY (RewardName) REFERENCES Reward (RewardName) ON DELETE CASCADE
);

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('cmcdavid1', 'Cpass1', TO_DATE('2023-03-15', 'YYYY-MM-DD'), 'cmcdavid@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('ntesla12', 'Npass3', TO_DATE('2023-04-22', 'YYYY-MM-DD'), 'ntesla@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('aeinstein30', 'Apass7', TO_DATE('2023-06-10', 'YYYY-MM-DD'), 'aeinstein@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('pshelby1', 'Ppass2', TO_DATE('2023-07-29', 'YYYY-MM-DD'), 'pshelby@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('tshebs', 'Tpass9', TO_DATE('2023-08-18', 'YYYY-MM-DD'), 'tshelby@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('ashebs12', 'Artpass9', TO_DATE('2023-08-18', 'YYYY-MM-DD'), 'artshelby@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('nomoney10', 'nmonpass10', TO_DATE('2023-08-20', 'YYYY-MM-DD'), 'igotnomoney@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('wildlife', 'wlifepass10', TO_DATE('2023-01-18', 'YYYY-MM-DD'), 'wlsaver@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('globewarm', 'gwarmpass1', TO_DATE('2023-04-12', 'YYYY-MM-DD'), 'gwarm@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('ubcneedsmoney', 'ubcpass1', TO_DATE('2023-10-05', 'YYYY-MM-DD'), 'ubc@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('sfuneedsmoney', 'sfupass1', TO_DATE('2023-10-12', 'YYYY-MM-DD'), 'sfu@gmail.com');

INSERT INTO Account (Username, Password, CreationDate, Email)
VALUES ('fundbenslife', 'fbenpass', TO_DATE('2023-07-12', 'YYYY-MM-DD'), 'fundben@gmail.com');

INSERT INTO PostalCode_Location (PostalCode, City, Province)
VALUES ('M5H1W7', 'Toronto', 'ON');

INSERT INTO PostalCode_Location (PostalCode, City, Province)
VALUES ('H2X1L4', 'Montreal', 'QC');

INSERT INTO PostalCode_Location (PostalCode, City, Province)
VALUES ('V6Z1K7', 'Vancouver', 'BC');

INSERT INTO PostalCode_Location (PostalCode, City, Province)
VALUES ('E1C4P9', 'Moncton', 'NB');

INSERT INTO PostalCode_Location (PostalCode, City, Province)
VALUES ('L5N2X2', 'Mississauga', 'ON');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('1111222233334444', '123', '123 Main St', 'M5H1W7');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('2222333344445555', '456', '456 Elm St', 'H2X1L4');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('3333444455556666', '789', '789 Oak St', 'V6Z1K7');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('4444555566667777', '234', '234 Pine St', 'E1C4P9');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('5555666777788888', '567', '567 Cedar St', 'L5N2X2');

INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
VALUES ('1234123412341234', '111', '111 Cedar St', 'L5N2X2');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('cmcdavid1', '3333444455556666', TO_DATE('1990-05-15', 'YYYY-MM-DD'), 'Connor', 'McDavid');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('ntesla12', '4444555566667777', TO_DATE('1950-01-12', 'YYYY-MM-DD'), 'Nikola', 'Tesla');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('aeinstein30', '5555666777788888', TO_DATE('1960-11-20', 'YYYY-MM-DD'), 'Albert', 'Einstein');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('tshebs', '1111222233334444', TO_DATE('1900-02-21', 'YYYY-MM-DD'), 'Tommy', 'Shelby');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('ashebs12', '1111222233334444', TO_DATE('1895-05-10', 'YYYY-MM-DD'), 'Arthur', 'Shelby');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('pshelby1', '2222333344445555', TO_DATE('1894-10-11', 'YYYY-MM-DD'), 'Polly', 'Shelby');

INSERT INTO Individual (Username, PaymentInfo, DateOfBirth, FirstName, LastName)
VALUES ('nomoney10', NULL, TO_DATE('1970-11-06', 'YYYY-MM-DD'), 'Dan', 'NoMoney');

INSERT INTO Organization (Username, FoundedDate, OrgName)
VALUES ('wildlife', TO_DATE('2000-08-15', 'YYYY-MM-DD'), 'Wildlife Preservation Inc');

INSERT INTO Organization (Username, FoundedDate, OrgName)
VALUES ('globewarm', TO_DATE('1950-10-11', 'YYYY-MM-DD'), 'Global Warming is Real');

INSERT INTO Organization (Username, FoundedDate, OrgName)
VALUES ('ubcneedsmoney', TO_DATE('2023-10-11', 'YYYY-MM-DD'), 'Give UBC Money Please');

INSERT INTO Organization (Username, FoundedDate, OrgName)
VALUES ('sfuneedsmoney', TO_DATE('2023-10-11', 'YYYY-MM-DD'), 'Give SFU Money Please');

INSERT INTO Organization (Username, FoundedDate, OrgName)
VALUES ('fundbenslife', TO_DATE('2023-10-11', 'YYYY-MM-DD'), 'Ben Wants Money');

INSERT INTO Organization_creates_Project (ProjectName, OUsername, Description, Balance)
VALUES ('Help Pandas', 'wildlife', 'Pandas are going extinct. Send money.', 0);

INSERT INTO Organization_creates_Project (ProjectName, OUsername, Description, Balance)
VALUES ('Stop Global Warming', 'globewarm', 'Hot in Herre by Nelly', 0);

INSERT INTO Organization_creates_Project (ProjectName, OUsername, Description, Balance)
VALUES ('Open more CPSC110 sections', 'ubcneedsmoney', 'Trust the natural recursion', 0);

INSERT INTO Organization_creates_Project (ProjectName, OUsername, Description, Balance)
VALUES ('Open more CPSC210 sections', 'ubcneedsmoney', 'Java', 0);

INSERT INTO Organization_creates_Project (ProjectName, OUsername, Description, Balance)
VALUES ('Bens Fund', 'fundbenslife', 'Ben needs money.', 0);

INSERT INTO Organization_creates_Post(PostID, OUsername, ProjectName, Content, ImageURL, Timestamp)
VALUES (101, 'wildlife', 'Help Pandas', 'Image of Panda', 'https://i.ebayimg.com/images/g/770AAOSwmYFjG-6w/s-l1600.jpg',
        CURRENT_TIMESTAMP);

INSERT INTO Organization_creates_Post(PostID, OUsername, ProjectName, Content, ImageURL, Timestamp)
VALUES (102, 'globewarm', 'Stop Global Warming', 'Time is running out.',
        'https://atmos.earth/wp-content/uploads/2022/10/mm93_evil_corporate_greed_stealing_a_habitable_future_5997b7c6-e742-4ce4-b948-8d22a4abaef4.jpg',
        CURRENT_TIMESTAMP);

INSERT INTO Organization_creates_Post(PostID, OUsername, ProjectName, Content, ImageURL, Timestamp)
VALUES (103, 'globewarm', 'Stop Global Warming', 'For a green future.',
        'https://cdn.wionews.com/sites/default/files/2023/03/21/340006-capping-global-warming.png', CURRENT_TIMESTAMP);

INSERT INTO Organization_creates_Post(PostID, OUsername, ProjectName, Content, ImageURL, Timestamp)
VALUES (104, 'ubcneedsmoney', 'Open more CPSC110 sections', 'Overcrowded CPSC Lecture Hall.',
        'https://i.cbc.ca/1.4826104.1537136387!/fileImage/httpImage/image.png_gen/derivatives/16x9_940/lumohacks-hackathon-sfu.png',
        CURRENT_TIMESTAMP);

INSERT INTO Organization_creates_Post(PostID, OUsername, ProjectName, Content, ImageURL, Timestamp)
VALUES (105, 'fundbenslife', 'Bens Fund', 'Help me get to class.',
        'https://m.media-amazon.com/images/I/71iEjFb5AAL.jpg', CURRENT_TIMESTAMP);

INSERT INTO Account_writes_Comment_on_Post(CommentID, Username, PostID, Timestamp, Content)
VALUES (0, 'tshebs', 105, CURRENT_TIMESTAMP,
        'Were gonna get ye that red bike and we hope to c ye riding it around brum.');

INSERT INTO Account_writes_Comment_on_Post(CommentID, Username, PostID, Timestamp, Content)
VALUES (1, 'cmcdavid1', 104, CURRENT_TIMESTAMP, 'No mean to chirp but thats a crazy');

INSERT INTO Account_writes_Comment_on_Post(CommentID, Username, PostID, Timestamp, Content)
VALUES (2, 'wildlife', 103, CURRENT_TIMESTAMP, 'Glad to see others doing something about the environment');

INSERT INTO Account_writes_Comment_on_Post(CommentID, Username, PostID, Timestamp, Content)
VALUES (3, 'ashebs12', 102, CURRENT_TIMESTAMP, 'No way');

INSERT INTO Account_writes_Comment_on_Post(CommentID, Username, PostID, Timestamp, Content)
VALUES (4, 'ashebs12', 105, CURRENT_TIMESTAMP, 'Ah a nice racing red');

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('tshebs', 'Bens Fund', 7, CURRENT_TIMESTAMP);

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('ntesla12', 'Help Pandas', 150, CURRENT_TIMESTAMP);

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('aeinstein30', 'Stop Global Warming', 10, CURRENT_TIMESTAMP);

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('tshebs', 'Help Pandas', 68, CURRENT_TIMESTAMP);

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('ashebs12', 'Open more CPSC110 sections', 100, CURRENT_TIMESTAMP);

INSERT INTO Individual_makes_Contribution(IUsername, ProjectName, Amount, Timestamp)
VALUES ('ashebs12', 'Open more CPSC210 sections', 500000, CURRENT_TIMESTAMP);

INSERT INTO Reward(RewardName, OUsername)
VALUES ('T-Shirt', 'wildlife');

INSERT INTO Reward(RewardName, OUsername)
VALUES ('Water Bottle', 'wildlife');

INSERT INTO Reward(RewardName, OUsername)
VALUES ('Discount Code', 'globewarm');

INSERT INTO Reward(RewardName, OUsername)
VALUES ('Tesla Model S', 'ubcneedsmoney');

INSERT INTO Reward(RewardName, OUsername)
VALUES ('CEOs Favorite Hat', 'fundbenslife');

INSERT INTO Individual_receives_Reward(RewardName, IUsername)
VALUES ('CEOs Favorite Hat', 'tshebs');

INSERT INTO Individual_receives_Reward(RewardName, IUsername)
VALUES ('Water Bottle', 'ntesla12');

INSERT INTO Individual_receives_Reward(RewardName, IUsername)
VALUES ('Discount Code', 'aeinstein30');

INSERT INTO Individual_receives_Reward(RewardName, IUsername)
VALUES ('T-Shirt', 'tshebs');

INSERT INTO Individual_receives_Reward(RewardName, IUsername)
VALUES ('Tesla Model S', 'ashebs12');

INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
VALUES (0, 'Help Pandas', 'wildlife', 'Donate 50$ and receive a t-shirt', 50, 100);

INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
VALUES (1, 'Help Pandas', 'wildlife', 'Donate 100$ and receive a water bottle', 100, 250);

INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
VALUES (2, 'Stop Global Warming', 'globewarm', 'Donate 10$ and receive a discount code for water', 10, 10);

INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
VALUES (3, 'Open more CPSC210 sections', 'ubcneedsmoney', 'Donate >=100000$ and receive an electric car', 100000,
        1000000);

INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
VALUES (4, 'Bens Fund', 'fundbenslife', 'Donate enough money for a subway sandwich and receive the ultimate reward', 5,
        1000000);

INSERT INTO PaymentTier_has_Reward(PayTierID, RewardName)
VALUES (0, 'T-Shirt');

INSERT INTO PaymentTier_has_Reward(PayTierID, RewardName)
VALUES (1, 'Water Bottle');

INSERT INTO PaymentTier_has_Reward(PayTierID, RewardName)
VALUES (2, 'Discount Code');

INSERT INTO PaymentTier_has_Reward(PayTierID, RewardName)
VALUES (3, 'Tesla Model S');

INSERT INTO PaymentTier_has_Reward(PayTierID, RewardName)
VALUES (4, 'CEOs Favorite Hat');

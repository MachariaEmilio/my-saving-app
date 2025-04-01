BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserDetails] (
    [id] INT NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [Fname] NVARCHAR(1000) NOT NULL,
    [Sname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [balance] INT NOT NULL,
    [savingsBalance] INT NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserDetails_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserDetails_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [UserDetails_phone_key] UNIQUE NONCLUSTERED ([phone])
);

-- CreateTable
CREATE TABLE [dbo].[transactionrecord] (
    [transaction_id] NVARCHAR(1000) NOT NULL,
    [receiver_id] INT NOT NULL,
    [sender_id] INT NOT NULL,
    [amount] INT NOT NULL,
    [timestamp] DATETIME2 NOT NULL,
    CONSTRAINT [transactionrecord_pkey] PRIMARY KEY CLUSTERED ([transaction_id])
);

-- CreateTable
CREATE TABLE [dbo].[savings] (
    [Userid] INT NOT NULL,
    [savingPercentage] INT NOT NULL,
    CONSTRAINT [savings_pkey] PRIMARY KEY CLUSTERED ([Userid])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

-- CreateIndex
CREATE INDEX "appointment_id_index" ON "Appointment"("id");

-- CreateIndex
CREATE INDEX "patient_id_index" ON "Patient"("id");

-- CreateIndex
CREATE INDEX "email_index" ON "Patient"("email");

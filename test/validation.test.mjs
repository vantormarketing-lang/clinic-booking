import { test } from "node:test"; import assert from "node:assert/strict"; import { z } from "zod";
const phone=z.string().regex(/^01[0-9]{9}$/);
const booking=z.object({clinicId:z.string().uuid(),doctorId:z.string().uuid(),fullName:z.string().trim().min(2).max(120),phone,startsAt:z.string().datetime(),visitType:z.enum(["checkup","consultation","followup"])});
test("accepts valid Egyptian mobile number",()=>assert.equal(phone.safeParse("01012345678").success,true));
test("rejects malformed mobile numbers",()=>{for(const n of ["123","0101234567","02012345678","010123456789"])assert.equal(phone.safeParse(n).success,false);});
test("valid booking shape passes",()=>assert.equal(booking.safeParse({clinicId:"08b67d59-5167-44a0-8288-a60c3f87b142",doctorId:"c8a00966-33c2-4c1b-811e-d7e3135b5697",fullName:"Test Patient",phone:"01012345678",startsAt:"2026-12-10T10:00:00.000Z",visitType:"checkup"}).success,true));
test("rejects missing IDs, short names and invalid visit type",()=>assert.equal(booking.safeParse({clinicId:"x",doctorId:"x",fullName:"A",phone:"01012345678",startsAt:"bad",visitType:"bad"}).success,false));

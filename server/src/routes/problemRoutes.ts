import express from 'express';
import { createProblem, createTestCase, runCode, getProblem, submitCode } from '../controllers/problemsController';

const router = express.Router();

router.get('/problems/:id', getProblem);

router.post('/problems', createProblem);

router.post('/problems/:id/submit', submitCode);

router.post('/problems/:id/testcase', createTestCase);

router.post('/problems/:id/run', runCode);

export default router;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { QuestionService } from './question/question.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const allowedOrigins = [
        'http://localhost:3000', // Local development
        'http://127.0.0.1:5501', // Local static hosting
        'https://thrivestrivia.netlify.app', // Deployed frontend (no trailing slash)
    ];
    app.enableCors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                const msg = "The CORS policy for this site does not allow access from the specified Origin: ${origin};"
                return callback(new Error(msg), false);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    
    // Get an instance of UserService
    const userService = app.get(UserService);
    
    // Call the addAdminUsers method
    await userService.addAdminUsers();

    // Get an instance of QuestionService
    const questionService = app.get(QuestionService);

    // const questions = [
    //     {
    //         content: 'What is the capital of Ethiopia?',
    //         options: ['Addis Ababa', 'Asmera', 'Djibouti', 'Nirobi'],
    //         correctAnswer: 'Addis Ababa',
    //         category: 'Geography',
    //     },
    //     {
    //         content: 'Who was the first emperor of Ethiopia?',
    //         options: ['Menelik II', 'Haile Seliase', 'Menelik I', 'Tewodros II'],
    //         correctAnswer: 'Menelik I',
    //         category: 'History',
    //     },
    //     {
    //         content: 'What is the traditional Ethiopian dish made from ingera and various stews called?',
    //         options: ['Sushi', 'pasta', 'Doro Wat', 'Tacos'],
    //         correctAnswer: 'Doro Wat',
    //         category: 'Culture',
    //     },
    // ];

    // try {
    //     await questionService.addQuestions(questions); // Use the instance to call addQuestions
    // } catch (error) {
    //     console.error('Error adding questions:', error);
    // }

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
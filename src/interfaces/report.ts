import express from 'express';

export namespace IReport {

  export interface ReportData {
    _id: string;
    restaurantId: string,
    commentId: string,
    userId: string,
    fullName: string,
    content: string,
    createdAt: Date;
    updatedAt: Date;
  }

  export interface UserRequest extends express.Request<{}, {}, {}, {}> {
    body: ReportData
  }
}
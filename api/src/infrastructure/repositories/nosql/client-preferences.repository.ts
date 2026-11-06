import { Injectable, Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/common';

export interface ClientPreference {
  id?: string;
  clientId: string;
  preferences: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ClientPreferencesRepository {
  private readonly logger = new Logger(ClientPreferencesRepository.name);
  private preferenceModel: Model<ClientPreference>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(ClientPreferencesRepository.name) private readonly prefModel: Model<ClientPreference>,
  ) {
    this.preferenceModel = prefModel;
    this.logger.log('ClientPreferencesRepository initialized');
  }

  async createPreference(clientId: string, preferences: Record<string, unknown>): Promise<ClientPreference> {
    try {
      const newPreference = new this.preferenceModel({
        clientId,
        preferences,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const saved = await newPreference.save();
      this.logger.log(`Preference created for client: ${clientId}`);
      return this.toPreference(saved);
    } catch (error) {
      this.logger.error(`Failed to create preference: ${error.message}`);
      throw error;
    }
  }

  async getPreferenceByClientId(clientId: string): Promise<ClientPreference | null> {
    try {
      const pref = await this.preferenceModel.findOne({ clientId }).exec();
      if (pref) {
        this.logger.log(`Preference retrieved for client: ${clientId}`);
        return this.toPreference(pref);
      }
      this.logger.warn(`No preference found for client: ${clientId}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to get preference: ${error.message}`);
      throw error;
    }
  }

  async updatePreference(clientId: string, preferences: Record<string, unknown>): Promise<ClientPreference | null> {
    try {
      const updated = await this.preferenceModel
        .findOneAndUpdate(
          { clientId },
          { preferences, updatedAt: new Date() },
          { new: true },
        )
        .exec();
      if (updated) {
        this.logger.log(`Preference updated for client: ${clientId}`);
        return this.toPreference(updated);
      }
      this.logger.warn(`No preference found to update for client: ${clientId}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to update preference: ${error.message}`);
      throw error;
    }
  }

  async deletePreference(clientId: string): Promise<boolean> {
    try {
      const result = await this.preferenceModel.findOneAndDelete({ clientId }).exec();
      if (result) {
        this.logger.log(`Preference deleted for client: ${clientId}`);
        return true;
      }
      this.logger.warn(`No preference found to delete for client: ${clientId}`);
      return false;
    } catch (error) {
      this.logger.error(`Failed to delete preference: ${error.message}`);
      throw error;
    }
  }

  private toPreference(doc: Record<string, unknown>): ClientPreference {
    return {
      id: doc._id?.toString(),
      clientId: doc.clientId as string,
      preferences: doc.preferences as Record<string, unknown>,
      createdAt: doc.createdAt as Date,
      updatedAt: doc.updatedAt as Date,
    };
  }

  async onModuleDestroy() {
    await this.connection.close();
    this.logger.log('MongoDB connection closed for preferences');
  }
}
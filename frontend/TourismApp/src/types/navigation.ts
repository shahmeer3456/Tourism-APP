import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;

  // Main App Stack
  MainApp: undefined;

  // Feature Screens
  DestinationDetails: {
    destination: {
      id: string;
      name: string;
      location: {
        city: string;
        country: string;
        coordinates: [number, number];
      };
      images: { url: string }[];
      price: number;
      rating: number;
      description: string;
    };
  };
  BookingConfirmation: {
    destination: {
      id: string;
      name: string;
      location: {
        city: string;
        country: string;
        coordinates: [number, number];
      };
      images: { url: string }[];
      price: number;
      rating: number;
      description: string;
    };
  };
  Review: {
    destination: {
      id: string;
      name: string;
      location: {
        city: string;
        country: string;
        coordinates: [number, number];
      };
      images: { url: string }[];
      price: number;
      rating: number;
      description: string;
    };
  };
  Bookings: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 